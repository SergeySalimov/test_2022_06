export class SharedHelper {
  static makeId(): string {
    let id = '';
    let characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    for ( let i = 0; i < 12; i++ ) {
      id += characters.charAt(Math.floor(Math.random() * 36));
    }

    return id;
  }
}
