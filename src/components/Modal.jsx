import React from 'react'
import {Dialog, DialogContent, DialogHeader, DialogTitle,} from "@/components/ui/dialog";

const Modal = ({isOpen, setIsOpen, closeDialog, children, title}) => {
    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogContent className="max-w-screen-xl px-12">
                <DialogHeader>
                    <DialogTitle className="text-3xl font-bold text-center">
                        {title}
                    </DialogTitle>
                </DialogHeader>
                {children}
            </DialogContent>
        </Dialog>
    )
}

export default Modal