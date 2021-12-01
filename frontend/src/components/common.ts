import signal_piano from "../ringtone/signal_piano.mp3";
import signal_piano_string from "../ringtone/signal_piano.mp3";
import signal_ring from "../ringtone/signal_ring.mp3";
import signal_bam from "../ringtone/signal.mp3";
import signal_bam_default from "../ringtone/signal.mp3";

export const optionRingtone: Array<{ value: string; label: string }> = [
  { value: "none", label: "none" },
  { value: signal_piano, label: "piano" },
  { value: signal_ring, label: "ring" },
  { value: signal_bam_default, label: "default" },
  // { value: signal_bam, label: "" },
  // { value: signal_piano_string, label: "string" },
];

export const correctValueMusic = (musicLabel: string) => {
  const [response] = optionRingtone.filter((item) => {
    return item.label === musicLabel;
  });
  return response.value;
};
export const correctLabelMusic = (musicValue: string) => {
  const [response] = optionRingtone.filter((item) => {
    return item.value === musicValue;
  });
  console.log("response.label", response.label)
  return response.label;
};
