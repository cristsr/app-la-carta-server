export class RecoveryPasswordDto {
  user: string;
  dueDate: string;
  hash: string;
  isCompleted?: boolean;
}
