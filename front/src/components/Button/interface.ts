export interface IButton {
    id?: string
    children: React.ReactNode;
    onClick?: (e: any) => void ;
    className?: string;
}