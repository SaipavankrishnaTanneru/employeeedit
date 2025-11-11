import React from 'react';
import { Box, Tabs, Tab } from '@mui/material';

const StyledTabs = ({ tabs = [], activeTab, onTabChange }) => {
  return (
    <Box
      sx={{
        display: 'inline-flex',
        backgroundColor: '#f5f5f5',
        borderRadius: '10px',
        padding: '4px',
        border: '1px solid #e0e0e0',
        maxWidth: '100%', // Ensures the container doesn't overflow its parent
      }}
    >
      <Tabs
        value={activeTab}
        onChange={onTabChange}
        variant="scrollable"
        scrollButtons="auto"
        allowScrollButtonsMobile
        TabIndicatorProps={{
          style: {
            display: 'none',
          },
        }}
      >
        {tabs.map((tab) => (
          <Tab
            key={tab.value}
            value={tab.value}
            label={tab.label}
            icon={tab.icon}
            iconPosition="start"
            sx={{
              // --- FIX FOR AUTO WIDTH ---
              minWidth: 'auto', // Allows the tab to shrink to its content's width
              padding: '6px 16px', // Provides comfortable spacing around the label and icon
              // --------------------------
              minHeight: '40px',
              textTransform: 'none',
              fontWeight: 500,
              fontSize: '0.875rem',
              color: 'text.secondary',
              margin: '0 4px',
              borderRadius: '8px',
              '&.Mui-selected': {
                backgroundColor: '#3f51b5',
                color: 'white',
              },
              '&:not(.Mui-selected):hover': {
                backgroundColor: 'rgba(0, 0, 0, 0.04)',
              },
            }}
          />
        ))}
      </Tabs>
    </Box>
  );
};

export default StyledTabs;
