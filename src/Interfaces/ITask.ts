import IProject from "./IProject";

export default interface ITask {
  id: number;
  time: number;
  description: string;
  project: IProject;
}
