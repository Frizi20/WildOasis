import { useEffect, useRef } from "react";

export default function useOutsideClick(
    handler,
    listenCapturing = true,
    active = true
) {
    const modal = useRef();
    const overlay = useRef();

    useEffect(() => {
        function handleClick(e) {
            if (modal.current && !modal.current.contains(e.target)) {
                (active ||
                    (overlay.current &&
                        overlay.current &&
                        overlay.current.contains(e.target))) &&
                    handler?.();
            }
        }

        document.addEventListener("click", handleClick, listenCapturing);

        return () =>
            document.removeEventListener("click", handleClick, listenCapturing);
    }, [handler, listenCapturing, active]);

    return { modal, overlay };
}
