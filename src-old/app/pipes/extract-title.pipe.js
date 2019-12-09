import { Pipe } from "@angular/core";
export class TitlePipe {
    transform(note, limit) {
        limit = parseInt(limit);
        if (note.title) {
            if (note.title.length == 0) {
                return this.getTitleFromString(note.content, limit);
            }
            else {
                return this.getTitleFromString(note.title, limit);
            }
        }
        else {
            return this.getTitleFromString(note.content, limit);
        }
    }
    getTitleFromString(str, limit) {
        if (str.length > limit) {
            return str.slice(0, limit) + '...';
        }
        else {
            return str;
        }
    }
}
TitlePipe.decorators = [
    { type: Pipe, args: [{
                name: "extractTitle"
            },] },
];
