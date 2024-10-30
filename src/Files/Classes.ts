

export class Directory {

    name: string
    dateCreated: string
    lastWritten: string
    children: (Directory | File)[] = []
    path: string
    size: number = 0
    parent: Directory | Drive
    index: number
    id: string
    constructor(name: string, dateCreated: string, lastWritten: string, path: string, parent: Directory | Drive, index: number) {
        this.parent = parent
        this.name = name
        this.dateCreated = dateCreated
        this.lastWritten = lastWritten
        this.path = path
        this.index = index
        this.id = this.parent.id + this.index

    }

}

export class File {

    name: string
    dateCreated: string
    lastWrite: string
    size: number
    path: string
    parent: Directory | Drive
    index: number
    id: string
    constructor(name: string, dateCreated: string, lastWrite: string, size: number, path: string, parent: Directory | Drive, index: number) {
        this.parent = parent
        this.name = name
        this.dateCreated = dateCreated
        this.lastWrite = lastWrite
        this.size = size
        this.path = path
        this.index = index
        this.id = this.parent.id + this.index

    }
}

export class Drive {
    name: string
    used: string
    free: string
    root: string
    children: (Directory | File)[] = []
    label: string
    driveLetter: string
    id: string
    constructor(name: string, used: string, free: string, root: string, label: string, driveLetter: string, id: string) {
        this.label = label
        this.name = name
        this.free = free
        this.used = used
        this.root = root
        this.driveLetter = driveLetter
        this.id = id
    }

}

export const defaultDrive: Drive = new Drive('', '', '', '', '', '', '')
export const defaultDir: Directory = new Directory('', '', '', '', defaultDrive, 0)