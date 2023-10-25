export type GroupType = {
    id: number;
    title: string;
    icon: JSX.Element;
    description?: string;
    isVisible: boolean;
    listItem: ItemType[];
}

export type ItemType = {
    id: string;
    name: string;
    icon: JSX.Element;
    isVisible: boolean;
}