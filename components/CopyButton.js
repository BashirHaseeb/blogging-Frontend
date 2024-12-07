'use client'; // Ensure this is a client-side component

import { useState } from 'react';

const CopyButton = ({ code }) => { // Expect the 'code' prop instead of 'codeString'
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(code);  // Copy the code to clipboard
            setCopied(true);  // Set copied to true to show the tick

            // Reset the tick after 2 seconds
            setTimeout(() => setCopied(false), 2000);
        } catch (error) {
            console.error('Failed to copy text: ', error);
        }
    };

    return (
        <button
            onClick={handleCopy}
            className="flex items-center space-x-2 text-sm bg-blue-600 text-white px-3 py-1 rounded-md"
        >
            {copied ? (
                <span>✔</span>  // Show a checkmark after copying
            ) : (
                <span>Copy</span>  // Default text
            )}
        </button>
    );
};

export default CopyButton;
