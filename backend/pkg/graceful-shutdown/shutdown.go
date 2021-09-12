package graceful_shutdown

import (
	"context"
	"fmt"
	"os"
	"os/signal"
	"sync"
	"syscall"
)

type (
	closerFunc func() error
	Closer struct {
		sync.Mutex
		closers map[string]closerFunc
	}
)

func New() *Closer {
	c := &Closer{
		Mutex:   sync.Mutex{},
		closers: make(map[string]closerFunc, 1),
	}

	ctx, stop := signal.NotifyContext(context.Background(),
		os.Interrupt,
		syscall.SIGTERM,
		syscall.SIGQUIT)

	go func() {
		fmt.Println("[graceful shutdown] waiting for shutdown signal...")

		<-ctx.Done()

		fmt.Printf("[graceful shutdown] shutdown signal received, closers len = %d\n", len(c.closers))

		c.Mutex.Lock()
		closers := c.closers
		c.closers = nil
		c.Mutex.Unlock()

		for n, shutdown := range closers {
			fmt.Printf("[graceful shutdown] shutdown %s service\n", n)
			if err := shutdown(); err != nil {
				fmt.Println(err)
			}
		}
		stop()
	}()

	return c
}

func (c *Closer) Subscribe(name string, closeFunc closerFunc) {
	if _, exist := c.closers[name]; exist {
		fmt.Printf("key-name %s exist in gracefull shutdown queue", name)
		return
	}
	c.Mutex.Lock()
	c.closers[name] = closeFunc
	c.Mutex.Unlock()
}