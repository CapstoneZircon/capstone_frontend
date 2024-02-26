import { Fragment, useRef, FC } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { ArrowLeftEndOnRectangleIcon } from '@heroicons/react/24/outline';

interface LogoutModalProps {
    showModal: boolean;
    closeModal: () => void;
    handleLogout: () => void;
}

const LogoutModal: FC<LogoutModalProps> = ({ showModal, closeModal, handleLogout }) => {
    const cancelButtonRef = useRef<HTMLButtonElement>(null);


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
                        <div className="bg-white max-w-md p-7 rounded-lg text-left overflow-hidden shadow-xl transition-all z-50">
                            <div className="flex items-start">
                                <div className="mr-4">
                                    <ArrowLeftEndOnRectangleIcon className="h-10 w-10 p-2 text-red-500 bg-red-50 rounded-full" aria-hidden="true" />
                                </div>
                                <div>
                                    <div className="text-left">
                                        <Dialog.Title as="h3" className="text-lg font-semibold leading-6 text-gray-900">
                                            Log Out of Your Account?
                                        </Dialog.Title>
                                    </div>
                                    <div className="mt-4">
                                        <p className="text-sm text-gray-500">
                                            Are you sure you want to logout? <br />
                                            You will be redirected to the login page.
                                        </p>
                                    </div>
                                    <div className="mt-4 flex justify-start">
                                        <button
                                            type="button"
                                            className="inline-flex justify-center px-4 py-2 text-sm font-medium text-white bg-red-600 border border-transparent rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                                            onClick={() => {
                                                closeModal();
                                                handleLogout();
                                            }}
                                        >
                                            Yes, log out
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

export default LogoutModal;