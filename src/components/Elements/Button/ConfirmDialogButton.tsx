const MODAL_ID = 'confirm-dialog';

type ConfirmDialogButtonProps = {
    message: string;
    onSelectOK: () => void;
    render: (modalId: string) => React.ReactNode;
};

export default function ConfirmDialogButton({
    message,
    onSelectOK,
    render,
}: ConfirmDialogButtonProps) {
    return (
        <>
            {render(MODAL_ID)}
            <input type="checkbox" id={MODAL_ID} className="modal-toggle" />
            <div className="modal">
                <div className="modal-box">
                    <h3 className="font-bold text-lg pb-4">Confirm</h3>
                    <p>{message}</p>
                    <div className="modal-action">
                        <div className="flex flex-row gap-2">
                            <label htmlFor={MODAL_ID} className="btn">
                                Cancel
                            </label>
                            <label
                                htmlFor={MODAL_ID}
                                className="btn btn-primary"
                                onClick={() => {
                                    onSelectOK();
                                }}
                            >
                                OK
                            </label>
                        </div>
                    </div>
                </div>
                <label className="modal-backdrop" htmlFor={MODAL_ID}>
                    Close
                </label>
            </div>
        </>
    );
}
