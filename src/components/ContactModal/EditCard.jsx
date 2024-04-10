import { useState } from "react"
import "./ContactsModal.css" // Import the CSS file containing styles
import { ToastContainer, toast } from "react-toastify"

const EditCard = (props) => {
    const { role, setRole, setEditMode, contactDetails } = props
    const [name, setName] = useState()
    const [address, setAddress] = useState()
    const [phone, setPhone] = useState()
    const [email, setEmail] = useState()
    const [photoUrl, setPhotoUrl] = useState(
        "https://thispersondoesnotexist.com/"
    )

    const handlePhotoChange = (e) => {
        const file = e.target.files[0]
        const reader = new FileReader()
        reader.onloadend = () => {
            setPhotoUrl(reader.result)
        }
        reader.readAsDataURL(file)
    }
    const newContact = {
        firstname: name,
        role: role,
        address: address,
        phoneNumber: phone,
        email: email,
    }
    const handleUpdateContact = async (e) => {
        e.preventDefault()
        const fetchPromise = new Promise(async (resolve, reject) => {
            try {
                const response = await fetch(
                    "https://tjf-challenge.azurewebsites.net/web/people/update",
                    {
                        headers: { "Content-Type": "application/json" },
                        method: "POST",
                        body: JSON.stringify(newContact),
                    }
                )
                if (!response || response.statusCode !== 200) {
                    reject(new Error(`HTTP error! Status: ${response.status}`))
                } else {
                    const data = await response.json()
                    resolve(data)
                }
            } catch (error) {
                console.error("Error fetching data:", error)
            } finally {
                setTimeout(() => {
                    setEditMode(false)
                }, 5000)
            }
        })
        toast.promise(fetchPromise, {
            pending: "Loading...",
            success: "Add new contact!",
            error: "Something went wrong",
        })
    }
    return (
        <>
            <form onSubmit={handleUpdateContact} className="card-edit-form">
                <div className="photo-input">
                    <img
                        className="card-edit-avatar"
                        src={photoUrl}
                        alt="avatar"
                    />
                    <label htmlFor="photo-upload">
                        <span>Change Photo</span>
                        <input
                            id="photo-upload"
                            type="file"
                            accept="image/*"
                            onChange={handlePhotoChange}
                        />
                    </label>
                </div>
                <input
                    type="text"
                    placeholder={
                        contactDetails?.firstname
                            ? contactDetails.firstname
                            : "First Name"
                    }
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                />

                <input
                    type="text"
                    placeholder="Role"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Address"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                />
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <button type="submit">Save</button>
            </form>
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
}
export default EditCard
