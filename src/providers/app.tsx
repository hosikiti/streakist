import { ReactNode } from "react";
import { TaskContextProvider } from "../features/tasks/task.context";

type AppProviderProps = {
    children: ReactNode;
};

export default function AppProvider({ children }: AppProviderProps) {
    return <TaskContextProvider>{children}</TaskContextProvider>;
}
