import { Tab, Tabs } from "@mui/material";
import { useTranslation } from "react-i18next";

function a11yProps(index: number) {
    return {
        id: `tab-${index}`,
        "aria-controls": `tabpanel-${index}`,
    };
}

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
    style?: React.CSSProperties;
}

function CustomTabPanel(props: Readonly<TabPanelProps>) {
    const { children, value, index, style, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`tabpanel-${index}`}
            aria-labelledby={`tab-${index}`}
            style={style}
            {...other}
        >
            {value === index && children}
        </div>
    );
}

type TabConfig = {
    key: string;
    vars?: Record<string, string | number>;
};

interface TabsComponentProps {
    value: number;
    tabs: TabConfig[];
    handleChange: (event: React.SyntheticEvent, newValue: number) => void;
}

function TabsComponent({
    value,
    tabs,
    handleChange,
}: Readonly<TabsComponentProps>) {
    const { t } = useTranslation();
    return (
        <Tabs value={value} onChange={handleChange}>
            {tabs.map(({ key, vars }, index) => {
                return <Tab label={t(`${key}`, vars)} {...a11yProps(index)} />;
            })}
        </Tabs>
    );
}

export { TabsComponent, CustomTabPanel };
