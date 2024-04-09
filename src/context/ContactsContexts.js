import React, { createContext, useContext, useState } from "react"

const ContactsContext = createContext()

export const useLocalContacts = () => useContext(ContactsContext)

export const ContactsProvider = ({ children }) => {
    const [localContacts, setLocalContacts] = useState([])

    const value = { localContacts, setLocalContacts }

    return (
        <ContactsContext.Provider value={value}>
            {children}
        </ContactsContext.Provider>
    )
}
