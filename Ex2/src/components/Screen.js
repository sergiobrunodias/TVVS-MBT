function Screen({ children, onSubmit = undefined, testid }) {
    if (onSubmit) {
        return (
            <section onSubmit={onSubmit} className="screen">
                {children}
            </section>
        );
    }
    return <section className="screen" data-testid={testid}>{children}</section>;
}

export default Screen;