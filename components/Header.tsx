import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import Link from "next/link"
export default function Header() {
    return (
        <NavigationMenu className="container pt-1 px-5">
            <NavigationMenuList>
                <NavigationMenuItem>
                    <NavigationMenuLink className="text-2xl">
                        <Link href='/'>PasteBin Lite </Link>
                    </NavigationMenuLink>
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>
    )
}