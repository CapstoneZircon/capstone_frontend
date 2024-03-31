import { Base64 } from "js-base64";

const encryptedPath = (path: string): string => {
    // Split the path at "/" characters
    const parts = path.split("/");
    
    // Encrypt each part separately except for parameters
    const encryptedParts = parts.map(part => {
        if (part.startsWith(":")) {
            // If the part is a parameter, leave it as is
            return part;
        } else {
            // Encrypt non-parameter parts
            return Base64.encode(part);
        }
    });
    
    // Join the parts back together with "/" characters
    return encryptedParts.join("/");
};

export default encryptedPath;

