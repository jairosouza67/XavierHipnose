export interface NavItem {
    id: string;
    label: string;
    icon?: string;
    href: string;
}

export interface Service {
    id: number;
    title: string;
    description: string;
    icon: string; // Lucide icon name
    color?: string;
    detailedInfo?: {
        howItHelps: string;
        benefits: string[];
        duration?: string;
    };
}

export interface Testimonial {
    name: string;
    role: string;
    image: string;
    rating: number;
    text: string;
}

export interface FAQ {
    q: string;
    a: string;
}

export interface Myth {
    m: string;
    v: string;
}

export type ViewState = 'home' | 'hipnose' | 'servicos' | 'sobre' | 'contato';
