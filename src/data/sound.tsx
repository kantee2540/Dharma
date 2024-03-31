import { soundFile } from "./soundFile";

export type sound = {
  id: number;
  sound_package_name: string;
  sound_package_folder: string;
  package_image: string;
  created_at: string;
  updated_at: string;
  data: soundFile[];
};
