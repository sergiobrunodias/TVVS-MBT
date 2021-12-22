function Screen({ children, onSubmit = undefined, testid }) {
    if (onSubmit) {
        return (
            <form onSubmit={onSubmit} className="screen">
                {children}
            </form>
        );
    }
    return <section className="screen" data-testid={testid}>{children}</section>;
}

export default Screen;