import signal_bam from "./signal.mp3";
import signal_piano from "./signal_piano.mp3";
import signal_ring from "./signal_ring.mp3";

type Ringtone = {
		readonly value: string;
		readonly label: string;
		readonly priority: number;
	};

const DefaultRingtoneArray: Ringtone[] = [
	{
		value: signal_piano,
		label: "piano",
		priority: 0
	},
	{
		value: signal_ring,
		label: "ring",
		priority: 1
	},
	{
		value: signal_bam,
		label: "bam",
		priority: 2
	},
];

export const GetRingtones = (): Ringtone[] => DefaultRingtoneArray;

export const GetDefaultRingtone = (): string => DefaultRingtoneArray.find(r => r.priority == 0)!.value;
