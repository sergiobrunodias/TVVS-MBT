function Screen({ children, onSubmit = undefined, testid = undefined }) {
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