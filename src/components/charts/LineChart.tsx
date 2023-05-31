import React from 'react';
import ReactApexChart from 'react-apexcharts';

type ChartProps = {
	// using `interface` is also ok
	[x: string]: any;
};
type ChartState = {
	chartData: any[];
	chartOptions: any;
	def_locales: any[];
};

class LineChart extends React.Component<ChartProps, ChartState> {
	constructor(props: { chartData: any[]; chartOptions: any, def_locales: any[] }) {
		super(props);

		this.state = {
			chartData: [],
			chartOptions: {},
			def_locales : [{
				name: 'es',
				options: {
				  months: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Setiembre', 'Octubre', 'Noviembre', 'Diciembre'],
				  shortMonths: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Set', 'Oct', 'Nov', 'Dic'],
				  days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
				  shortDays: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
				  toolbar: {
					download: 'Download SVG',
					selection: 'Selection',
					selectionZoom: 'Selection Zoom',
					zoomIn: 'Zoom In',
					zoomOut: 'Zoom Out',
					pan: 'Panning',
					reset: 'Reset Zoom',
				  }
				}
			}]
			
		};
	}

	componentDidMount() {
		this.setState({
			chartData: this.props.chartData,
			chartOptions: this.props.chartOptions
		});
	}

	render() {
		// <Chart options={{ ...data.options, locales: [esLocale], locale: 'es' }} series={data.series} type="bar" height={350} />
		return (
			<ReactApexChart
				// options={this.state.chartOptions}
				options={{ ...this.state.chartOptions, locales:this.state.def_locales, locale: 'es', defaultLocale:'es' }}
				series={this.state.chartData}
				type='line'
				width='100%'
				height='100%'
				locales={this.state.def_locales}
				locale={'es'}
				defaultLocale={'es'}
			/>
		);
	}
}

export default LineChart;
