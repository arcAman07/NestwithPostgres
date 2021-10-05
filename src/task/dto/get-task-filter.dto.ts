/* eslint-disable prettier/prettier */
import { TaskStatus } from '../task.model';
export class GetTaskFilter {
  status?: TaskStatus; // ? symbolizes that its an optional parameter and not required
  search?: string;
}
