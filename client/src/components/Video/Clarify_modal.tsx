import { Fragment, useRef, FC, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { Input } from '@material-tailwind/react';

interface ClarifyModalProps {
    showModal: boolean;
    closeModal: () => void;
    videoDocumentId: string;
    updateData: (document: string, newNote: string, password: string) => Promise<void>; // Add updateData prop
}

const ClarifyModal: FC<ClarifyModalProps> = ({ showModal, closeModal, videoDocumentId, updateData }) => {
    const cancelButtonRef = useRef<HTMLButtonElement>(null);
    const [note, setNote] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [passwordIncorrect, setPasswordIncorrect] = useState<boolean>(true); // State to track if password is incorrect

    const handleClarify = async () => {
        // Call the updateData function with videoDocumentId, note, and password
        try {
            await updateData(videoDocumentId, note, password);
            setPasswordIncorrect(false); // Reset password incorrect state
            // Optionally, you can handle success or display a message to the user
            // closeModal(); // Close the modal after updating the note
        } catch (error: any) {
            console.error('Error updating note:', error);
            // Optionally, you can handle errors or display a message to the user
            console.log("hi40111 ja")
            if (error.response.status === 401) {
                setPasswordIncorrect(true); // Set password incorrect state
            }
        }
    };

    return (
        <Transition.Root show={showModal} as={Fragment}>
            <Dialog
                as="div"
                className="fixed inset-0 z-50 overflow-y-auto"
                onClose={() => closeModal()}
                initialFocus={cancelButtonRef}
            >
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <Dialog.Overlay
                        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
                        onClick={() => closeModal()}
                    />
                </Transition.Child>

                <div className="flex items-center justify-center min-h-screen">
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        enterTo="opacity-100 translate-y-0 sm:scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                        leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    >
                        <div className="bg-white p-7 rounded-lg text-left overflow-hidden shadow-xl transition-all z-50">
                            <div className="flex items-start">
                                <div>
                                    <div className="text-left">
                                        <Dialog.Title as="h3" className="text-lg font-semibold leading-6 text-gray-900">
                                            Please Verify
                                        </Dialog.Title>
                                    </div>
                                    <div className="mt-2 w-96 h-auto">
                                        <p className="text-sm text-gray-500">
                                            Note (optional)
                                        </p>
                                        <textarea 
                                            id="note" 
                                            name="note" 
                                            rows={7}  
                                            cols={43} 
                                            className='border-[1px] border-gray-400 rounded-lg w-96 resize-none p-2'
                                            value={note}
                                            onChange={(e) => setNote(e.target.value)}
                                        />
                                    </div>
                                    <div className="mt-2">
                                        <p className="text-sm text-gray-500">
                                            Password
                                        </p>
                                        <Input 
                                            type="password"
                                            value={password}
                                            onChange={(e) => setPassword(e.target.value)}
                                        />
                                    </div>

                                    {passwordIncorrect && ( // Conditionally render the error message
                                        <p className="mt-2 text-sm text-red-500">
                                            Incorrect password. Please try again.
                                        </p>
                                    )}

                                    <div className="mt-4 flex justify-end">
                                        <button
                                            type="button"
                                            className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                                            onClick={handleClarify} // Call handleClarify function when button is clicked
                                        >
                                            Clarify
                                        </button>
                                        <button
                                            type="button"
                                            className="ml-3 inline-flex justify-center px-4 py-2 text-sm font-medium text-gray-700 rounded-md hover:bg-gray-200"
                                            onClick={() => closeModal()}
                                            ref={cancelButtonRef}
                                        >
                                            Cancel
                                        </button>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition.Root>
    );
};

export default ClarifyModal;
