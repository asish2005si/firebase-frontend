
type FormHeaderProps = {
    title: string;
    description: string;
}

export function FormHeader({ title, description }: FormHeaderProps) {
    return (
        <div className="mb-6">
            <h2 className="text-2xl font-bold font-headline text-primary">{title}</h2>
            <p className="text-muted-foreground mt-1">{description}</p>
        </div>
    )
}
