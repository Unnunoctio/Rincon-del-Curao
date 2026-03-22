'use client'

import { LogoFull } from '@/components/logo'
import { SearchInput } from '@/components/search-input'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarHeader,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarMenuSub,
    SidebarMenuSubButton,
    SidebarMenuSubItem,
} from '@/components/ui/sidebar'
import { navCategories, navMain } from '@/config/nav'
import { useStores } from '@/providers/stores-provider'
import { ChevronRight, Store } from 'lucide-react'
import Link from 'next/link'

export function AppSidebar() {
    const { open: openStores } = useStores()

    return (
        <Sidebar>
            <SidebarHeader className="gap-6 py-6">
                <LogoFull className="h-9 text-primary" />
                <SearchInput />
            </SidebarHeader>

            <SidebarContent>
                {/* Nav principal */}
                <SidebarGroup className="p-0">
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {navMain.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton
                                        render={<Link href={item.href} />}
                                        className="gap-3 text-muted-foreground hover:text-foreground"
                                    >
                                        <item.icon className="size-5 shrink-0" />
                                        <span>{item.title}</span>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}

                            {/* Tiendas — abre modal */}
                            <SidebarMenuItem>
                                <SidebarMenuButton onClick={openStores} className="gap-3 cursor-pointer text-muted-foreground hover:text-foreground">
                                    <Store className="size-5 shrink-0" />
                                    <span>Tiendas</span>
                                </SidebarMenuButton>
                            </SidebarMenuItem>
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>

                {/* Categorías colapsables */}
                <SidebarGroup className="p-0 pt-5">
                    <SidebarGroupLabel>Categorías</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu className="flex flex-col gap-1">
                            {navCategories.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <Collapsible className="group/collapsible w-full">
                                        <CollapsibleTrigger className="flex w-full cursor-pointer items-center gap-3 rounded-md px-2 py-2 text-muted-foreground transition-colors hover:bg-sidebar-accent hover:text-foreground">
                                            <item.icon className="size-5 shrink-0" />
                                            <span className="flex-1 text-left text-sm">{item.title}</span>
                                            <ChevronRight className="size-4 shrink-0 transition-transform duration-200 group-data-open/collapsible:rotate-90" />
                                        </CollapsibleTrigger>
                                        <CollapsibleContent>
                                            <SidebarMenuSub>
                                                {item.items.map((sub) => (
                                                    <SidebarMenuSubItem key={sub.title}>
                                                        <SidebarMenuSubButton
                                                            render={<Link href={sub.href} />}
                                                            className="text-muted-foreground hover:text-foreground"
                                                        >
                                                            {sub.title}
                                                        </SidebarMenuSubButton>
                                                    </SidebarMenuSubItem>
                                                ))}
                                            </SidebarMenuSub>
                                        </CollapsibleContent>
                                    </Collapsible>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    )
}
