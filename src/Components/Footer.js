import React from 'react';

export function Footer() {

    function refreshPage() {
        window.location.reload();
      }

    return (
        <div className="bottom-0">
            <div className="mx-auto w-min mb-3">
                <button className="p-3 marvel w-60 text-white font-extrabold text-xl hover:bg-gray-900" onClick={refreshPage}>NEW CHARACTER</button>
            </div>
        </div>
    )
}