import React, { useState } from 'react';

interface TabProps {
    tabs: {
        label: string;
        content: React.ReactNode;
    }[];
}

const Tab = ({ tabs }: TabProps | undefined) => {
    const [activeTab, setActiveTab] = useState(0);

    return (
        <div className="w-full">
            <div className="flex border-b">
                {tabs.map((tab, index) => (
                    <button
                        key={index}
                        className={`sm:px-4 px-2 py-2 text-sm sm:text-base ${
                            activeTab === index
                                ? 'text-main font-semibold border-b-4 border-main'
                                : 'text-gray-700'
                        }`}
                        onClick={() => setActiveTab(index)}
                    >
                        {tab.label}
                    </button>
                ))}
            </div>
            <div className="p-4">
                {tabs[activeTab].content}
            </div>
        </div>
    );
};

export default Tab;