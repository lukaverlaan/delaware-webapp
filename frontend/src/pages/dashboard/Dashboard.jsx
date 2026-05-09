import { useAuth } from "../../contexts/auth";
import { useEffect, useState, useRef } from "react";
import { Responsive } from "react-grid-layout";

import KPIWidget from "../../components/dashboard/KPIWidget";
import PlanningWidget from "../../components/dashboard/PlanningWidget";
import NotificationsWidget from "../../components/dashboard/NotificationsWidget";
import MyTasksWidget from "../../components/dashboard/MyTasksWidget";
import SitesWidget from "../../components/dashboard/SitesWidget";
import TasksChart from "../../components/dashboard/TasksChart";
import QuickActions from "../../components/dashboard/QuickActions";

import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";

const ResponsiveGridLayout = Responsive;

const layouts = {
    lg: [
        { i: "kpi", x: 0, y: 0, w: 12, h: 2, minH: 2, minW: 4 },
        { i: "planning", x: 0, y: 2, w: 6, h: 4, minH: 3, minW: 3 },
        { i: "tasks", x: 6, y: 2, w: 6, h: 4, minH: 3, minW: 3 },
        { i: "chart", x: 0, y: 6, w: 6, h: 5, minH: 4, minW: 3 },
        { i: "notifications", x: 6, y: 6, w: 3, h: 5, minH: 3, minW: 2 },
        { i: "sites", x: 9, y: 6, w: 3, h: 5, minH: 3, minW: 2 },
    ],
    md: [
        { i: "kpi", x: 0, y: 0, w: 8, h: 2 },
        { i: "planning", x: 0, y: 2, w: 4, h: 4 },
        { i: "tasks", x: 4, y: 2, w: 4, h: 4 },
        { i: "chart", x: 0, y: 6, w: 5, h: 5 },
        { i: "notifications", x: 5, y: 6, w: 3, h: 5 },
        { i: "sites", x: 0, y: 11, w: 4, h: 4 },
    ],
    sm: [
        { i: "kpi", x: 0, y: 0, w: 4, h: 2 },
        { i: "planning", x: 0, y: 2, w: 4, h: 4 },
        { i: "tasks", x: 0, y: 6, w: 4, h: 4 },
        { i: "chart", x: 0, y: 10, w: 4, h: 5 },
        { i: "notifications", x: 0, y: 15, w: 4, h: 4 },
        { i: "sites", x: 0, y: 19, w: 4, h: 4 },
    ],
};

export default function Dashboard() {
    const { user } = useAuth();
    const containerRef = useRef(null);
    const [allLayouts, setAllLayouts] = useState({});
    const [width, setWidth] = useState(0);

    useEffect(() => {
        if (!containerRef.current) return;

        const observer = new ResizeObserver(entries => {
            for (const entry of entries) {
                setWidth(entry.contentRect.width);
            }
        });

        observer.observe(containerRef.current);
        return () => observer.disconnect();
    }, []);

    useEffect(() => {
        const oldSaved = localStorage.getItem("dashboard-layout");
        if (oldSaved) localStorage.removeItem("dashboard-layout");

        const saved = localStorage.getItem("dashboard-layouts");
        if (saved) {
            try {
                setAllLayouts(JSON.parse(saved));
            } catch {
                setAllLayouts({});
            }
        }
    }, []);

    const handleLayoutChange = (_currentLayout, allLayouts) => {
        setAllLayouts(allLayouts);
        localStorage.setItem("dashboard-layouts", JSON.stringify(allLayouts));
    };

    const mergedLayouts = {
        ...layouts,
        ...Object.fromEntries(
            Object.entries(allLayouts).map(([bp, saved]) => [
                bp,
                layouts[bp]?.map(def => saved.find(s => s.i === def.i) ?? def) ?? saved,
            ])
        ),
    };

    return (
        <div className="p-6 max-w-6xl lg:max-w-7xl mx-auto">

            <div className="mb-4">
                <h1 className="text-3xl font-semibold">Dashboard</h1>
                <p className="text-gray-400">Welkom {user?.voornaam}</p>
            </div>

            <QuickActions />

            <div ref={containerRef}>
                {width > 0 && (
                    <ResponsiveGridLayout
                        width={width}
                        layouts={mergedLayouts}
                        breakpoints={{ lg: 1200, md: 1024, sm: 768 }}
                        cols={{ lg: 12, md: 8, sm: 4 }}
                        rowHeight={60}
                        margin={[16, 16]}
                        containerPadding={[0, 0]}
                        onLayoutChange={handleLayoutChange}
                        isResizable={true}
                        resizeHandles={["se"]}
                        draggableHandle=".drag-handle"
                    >
                        <div key="kpi">
                            <WidgetWrapper title="Overzicht">
                                <KPIWidget />
                            </WidgetWrapper>
                        </div>

                        <div key="planning">
                            <WidgetWrapper title="Planning">
                                <PlanningWidget />
                            </WidgetWrapper>
                        </div>

                        <div key="tasks">
                            <WidgetWrapper title="Mijn taken">
                                <MyTasksWidget />
                            </WidgetWrapper>
                        </div>

                        <div key="chart">
                            <WidgetWrapper title="Statistiek">
                                <TasksChart />
                            </WidgetWrapper>
                        </div>

                        <div key="notifications">
                            <WidgetWrapper title="Meldingen">
                                <NotificationsWidget />
                            </WidgetWrapper>
                        </div>

                        <div key="sites">
                            <WidgetWrapper title="Sites">
                                <SitesWidget />
                            </WidgetWrapper>
                        </div>
                    </ResponsiveGridLayout>
                )}
            </div>
        </div>
    );
}

function WidgetWrapper({ title, children }) {
    return (
        <div className="surface rounded-xl h-full flex flex-col overflow-hidden">

            {/* HEADER */}
            <div className="
                drag-handle
                px-3 py-2
                border-b border-gray-200 dark:border-gray-800
                cursor-move
                flex items-center justify-between
                bg-gray-50 dark:bg-white/5
            ">
                <h3 className="text-sm font-semibold">{title}</h3>
                <span className="text-xs text-gray-400">⋮⋮</span>
            </div>

            <div className="flex-1 p-2 overflow-auto text-sm">
                {children}
            </div>

        </div>
    );
}