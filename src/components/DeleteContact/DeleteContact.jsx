import React, { forwardRef, useState } from "react"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { useLocalContacts } from "../../context/ContactsContexts"
import { usePage } from "../../context/PageContext"
import useFetchData from "../../hooks/useFetchData"

const DeleteContact = forwardRef((props, ref) => {
    const {
        selectedContactId,
        active,
        activeClass,
        noActiveClass,
        customClass,
    } = props

    const [showConfirmationModal, setShowConfirmationModal] = useState(false)
    const [isDeleted, setIsDeleted] = useState(false)
    const { currentPage } = usePage()
    const { fetchContacts } = useContacts(currentPage)

    const handleDelete = async () => {
        let formData = new FormData()
        formData.append("id", selectedContactId)

        try {
            const response = await fetch(
                "https://tjf-challenge.azurewebsites.net/web/people/delete",
                {
                    method: "DELETE",
                    body: formData,
                }
            )

            if (response.ok) {
                setIsDeleted(true)
                toast.success("Contact deleted successfully!")
                // Reload contacts after deletion
                await fetchContacts()
            } else {
                toast.error("Failed to delete contact")
            }
        } catch (error) {
            console.error("Error deleting contact:", error)
            toast.error("Something went wrong")
        }
    }

    const handleDeleteConfirmation = async () => {
        setShowConfirmationModal(false)
        await handleDelete()
    }

    const handleCardClose = () => {
        setIsDeleted(false)
    }

    return (
        <>
            <button
                onClick={() => setShowConfirmationModal(true)}
                className={`${
                    active ? activeClass : noActiveClass
                } hover:bg-subdue hover:text-neutral  ${customClass}`}
            >
                Delete
            </button>
            {showConfirmationModal && !isDeleted && (
                <div className="fixed inset-0 z-50 overflow-y-auto flex justify-center items-center">
                    <div className="absolute inset-0 bg-subdue opacity-75"></div>
                    <div className="bg-neutral w-1/3 p-6 rounded-lg z-50">
                        <p>Are you sure you want to delete this contact?</p>
                        <div className="mt-4 flex justify-end">
                            <button
                                onClick={() => setShowConfirmationModal(false)}
                                className="mr-2 px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleDeleteConfirmation}
                                className="px-4 py-2 bg-accent text-white rounded-md hover:bg-accentDark"
                            >
                                Confirm
                            </button>
                        </div>
                    </div>
                    <style jsx>{`
                        @media (max-width: 768px) {
                            .fixed.inset-0 > div:nth-child(2) {
                                width: 90%;
                            }
                        }
                    `}</style>
                </div>
            )}
            {isDeleted && (
                <div className="fixed inset-0 flex justify-center items-center">
                    <div className="bg-neutral p-6 rounded-lg shadow-md w-72">
                        <div className="flex justify-between items-center">
                            <p className="text-lg font-semibold text-subdue">
                                Deleted
                            </p>
                            <button
                                onClick={handleCardClose}
                                className="focus:outline-none"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    fill="currentColor"
                                    className="bi bi-x text-subdue hover:text-vivid"
                                    viewBox="0 0 16 16"
                                >
                                    <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
            )}
            <ToastContainer
                position="bottom-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
            />
        </>
    )
})

export default DeleteContact
