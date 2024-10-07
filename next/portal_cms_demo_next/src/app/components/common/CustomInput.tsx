import { useRef, forwardRef } from "react";

const Input = forwardRef((props, ref) => {
    return <input type="text" ref={ref} />;
});

const Field = () => {
    const inputRef = useRef(null);
    const focusHandler = () => {
        inputRef.current.foucus();
    };

    return(
        <>
            <Input ref={inputRef} />
            <button onClick={focusHandler}>focus</button>
        </>
    );
};