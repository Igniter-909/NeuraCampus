export const generateUniqueFrequency = async () => {
    // Generate a random frequency between 18000-20000 Hz (above human hearing range)
    const frequency = Math.floor(Math.random() * (20000 - 18000) + 18000);
    const duration = 5; // seconds
    const code = `${frequency}-${Date.now()}`;
    
    return {
        frequency,
        duration,
        code
    };
};

export const verifyFrequency = async (receivedCode) => {
    // Verify if the code is valid and not expired (within 5 minutes)
    const [frequency, timestamp] = receivedCode.split('-');
    const now = Date.now();
    const codeTime = parseInt(timestamp);
    
    return (now - codeTime) <= 300000; // 5 minutes in milliseconds
}; 