export type PopupModel ={
title: string,
message: string,
onClose: () => void,
onYes: (pId: number) => Promise<void>,
}