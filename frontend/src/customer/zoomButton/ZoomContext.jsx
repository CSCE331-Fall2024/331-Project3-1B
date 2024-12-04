import React, { createContext, useContext, useState, useEffect } from 'react';

// Creating context
const ZoomContext = createContext();

// Custom hook to access the zoom context
export function UseZoom() {
    return useContext(ZoomContext);
}

// Provider component to wrap the app or a section of the app
export function ZoomProvider({ children }) {
    const [zoomLevel, setZoomLevel] = useState(1);

    useEffect(() => {
        const savedZoom = localStorage.getItem('zoomLevel');
        if (savedZoom) {
            setZoomLevel(parseFloat(savedZoom));
        }
    }, []);

    const toggleZoom = () => {
        const newZoom = zoomLevel === 1 ? 1.4 : 1;
        setZoomLevel(newZoom);
        localStorage.setItem('zoomLevel', newZoom);
    };

    return (
        <ZoomContext.Provider value={{ zoomLevel, toggleZoom }}>
            <div 
                style={{ 
                    transform: `scale(${zoomLevel})`, 
                    transformOrigin: 'top left', 
                    transition: 'transform 0s',
                    width: `${100 / zoomLevel}%` // Prevent horizontal overflow
                }}
            >
                {children}
            </div>
        </ZoomContext.Provider>
    );
}
