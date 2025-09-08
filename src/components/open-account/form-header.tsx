
type FormHeaderProps = {
    title: string;
    description: string;
}

export function FormHeader({ title, description }: FormHeaderProps) {
    return (
        <div className="mb-8 text-center">
            <h2 className="text-2xl md:text-3xl font-bold font-headline text-primary">{title}</h2>
            <p className="text-muted-foreground mt-2 max-w-xl mx-auto">{description}</p>
        </div>
    )
}
