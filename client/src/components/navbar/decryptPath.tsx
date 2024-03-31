// Decrypted code
const decryptedPath = (encryptedPath: string): string => {
    // Split the encrypted path at "/" characters
    const parts = encryptedPath.split("/");
    
    // Decrypt each part separately except for parameters
    const decryptedParts = parts.map(part => {
        if (part.startsWith(":")) {
            // If the part is a parameter, leave it as is
            return part;
        } else {
            // Decrypt non-parameter parts
            return new TextDecoder().decode(Uint8Array.from(atob(part), c => c.charCodeAt(0)));
        }
    });
    
    // Join the parts back together with "/" characters
    return decryptedParts.join("/");
};

export default decryptedPath;
