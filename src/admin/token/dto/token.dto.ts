

export class AdminTokenDto {
  id: string;
  firstName: string;

  constructor(entity) {
    this.id = entity.id;
    this.firstName = entity.firstName;
  }
}
