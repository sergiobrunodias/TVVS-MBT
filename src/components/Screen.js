function Screen({ children, onSubmit = undefined }) {
    if (onSubmit) {
        return (
            <form onSubmit={onSubmit} className="screen">
                {children}
            </form>
        );
    }
    return <section className="screen">{children}</section>;
}

export default Screen;