import React from 'react';
import { LucideIcon } from 'lucide-react';
import { cn } from '../../utils/cn';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'danger';
    icon?: LucideIcon;
    children: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
    variant = 'primary',
    icon: Icon,
    children,
    className,
    ...props
}) => {
    const baseStyles = 'inline-flex items-center px-4 py-2 border text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2';

    const variants = {
        primary: 'border-transparent text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500',
        secondary: 'text-gray-300 bg-gray-700 border-gray-600 hover:bg-gray-600 focus:ring-gray-500',
        danger: 'border-transparent text-white bg-red-600 hover:bg-red-700 focus:ring-red-500'
    };

    return (
        <button
            className={cn(baseStyles, variants[variant], className)}
            {...props}
        >
            {Icon && <Icon className="h-4 w-4 mr-2" />}
            {children}
        </button>
    );
}