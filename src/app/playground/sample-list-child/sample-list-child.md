### List with Parent and Child Components
This example demonstrates a list component in which each list entry is represented by a separate child component.
The parent component maintains a data array (persons) and iterates over it, passing each individual item to the child component through an @Input property.
With this approach, each child component receives and manages only a single data entry, ensuring a clear separation of concerns and improved component reusability.
