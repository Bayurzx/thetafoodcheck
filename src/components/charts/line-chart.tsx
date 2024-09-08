// src/components/charts/line-chart.tsx
'use client';

import dynamic from 'next/dynamic';
import React from 'react';
import { ReactApexChartProps, ApexOptions } from '@/types/react-apexcharts';

// Dynamically import ApexChart without SSR
const ApexChart = dynamic(() => import('react-apexcharts'), { ssr: false });

// Define the types for the props
interface ExampleChartProps {
    options?: ApexOptions;
    series?: ReactApexChartProps['series'];
    type: ReactApexChartProps['type'];
    height?: number | string;
    width?: number | string;
}

// ExampleChart component with props and default values
export function LineChart({
    options = {
        chart: {
            id: 'apexchart-example',
        },
        xaxis: {
            categories: [1991, 1992, 1993, 1994, 1995, 1996, 1997, 1998, 1999],
        },
    },
    series = [
        {
            name: 'series-1',
            data: [30, 40, 35, 50, 49, 60, 70, 91, 125],
        },
    ],
    type,
    height = 200, // Default height
    width = 500,  // Default width
}: ExampleChartProps) {
    return (
        <>
            <div className="w-full h-full text-black">
                <ApexChart type={type} options={options} series={series} height={height} width={width} />
            </div>
        </>
    );
}
