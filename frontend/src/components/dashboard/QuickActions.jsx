import { Link } from "react-router";

export default function QuickActions() {
    return (
        <div className="flex flex-wrap gap-3 mb-6">
            <Link
                to="/taken/add"
                className="primary px-4 py-2 rounded-lg"
            >
                + Taak toevoegen
            </Link>

            <Link
                to="/planning"
                className="px-4 py-2 border rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
            >
                Planning
            </Link>

            <Link
                to="/sites"
                className="px-4 py-2 border rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
            >
                Sites
            </Link>
        </div>
    );
}