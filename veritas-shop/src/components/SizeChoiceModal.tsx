import { forwardRef, useImperativeHandle, useRef } from "react";
import closeIcon from "../assets/regular-icons/window-close.svg"
import "./styles/SizeChoiceModal.css"

// Necessary for open/close from outside the component
interface SizeModalHandles {
    open: () => void;
    close: () => void;
    blur: () => void;
}
  
interface SizeModalProps {
    setSize: (size: number) => void;
}

const SizeModal = 
forwardRef<SizeModalHandles, SizeModalProps>(({ setSize }, ref) => {
    const lastSizeButtonRef = useRef<HTMLButtonElement>(null);
    const dialogRef = useRef<HTMLDialogElement>(null);
    const btnRef = useRef<HTMLButtonElement>(null);

    // Function that hold the tab-navigation in the modal
    const handleBlurLastBtn =  (e: React.KeyboardEvent<HTMLButtonElement>) => {
        if (e.key === 'Tab' && !e.shiftKey) {
            e.preventDefault();
            if (btnRef.current)btnRef.current.focus();
        }
    }

    // Sizes from 35 to 51
    const sizes = Array.from({ length: 50 - 35 + 1 }, (_, i) => 35 + i);

    // Possible to open/close the modal from outside
    useImperativeHandle(ref, () => ({
        open: () => dialogRef.current?.showModal(),
        close: () => dialogRef.current?.close(),
        blur: () => btnRef.current?.blur(), 
    }))

    const handleSizeClick = (size: number) => {
        setSize(size);
        dialogRef.current?.close();
    }

    const handleOutsideClick = (e: React.MouseEvent<HTMLDialogElement>) => {
        if (e.target === dialogRef.current) {
          dialogRef.current?.close();
        }
    }

    return (
        <dialog ref={dialogRef} className="modalSizes" onClick={handleOutsideClick}>
            <div className="modalSizesContainer">
                <button ref={btnRef} className="closeBtnModalSizes" autoFocus={false}
                onClick={() => dialogRef.current?.close()}>
                    <img src={closeIcon} alt="Close Button" loading="lazy" />
                </button>

                <h2 className="modalSizesH">Schuhgröße wählen</h2>

                <div className="sizesContainer">
                    {sizes.map((size, index) => (
                        <button
                        key={size}
                        className="sizeButton"
                        onClick={() => handleSizeClick( size )}
                        ref={index === sizes.length - 1 ? lastSizeButtonRef : null}
                        onKeyDown={index === sizes.length - 1 ? (e) => handleBlurLastBtn(e): undefined}>
                        {size}
                        </button>
                    ))}
                </div>
            </div>
      </dialog>
    )
});

export { SizeModal };
export type { SizeModalHandles };
