import * as React from 'react';
import { X } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import {
	Command,
	CommandGroup,
	CommandItem,
	CommandPrimitive,
} from '@/components/ui/command';

export type OptionType = {
	id: string;
	name: string;
};

interface FancyMultiSelectProps {
	options: OptionType[];
	selected: OptionType[]; // Assuming 'selected' is an array of OptionType
	onChange: (selectedOptions: OptionType[]) => void; // Adjust the type based on how you handle the change event
}

export function FancyMultiSelect({
	options: propOptions, // Renaming the prop to avoid conflict with state
	selected: externalSelected,
	onChange,
}: FancyMultiSelectProps) {
	const inputRef = React.useRef<HTMLInputElement>(null);
	const [open, setOpen] = React.useState(false);
	const [options, setOptions] = React.useState<OptionType[]>(propOptions || []); // Using the renamed prop
	const [selected, setSelected] = React.useState<OptionType[]>(
		externalSelected || [],
	);
	const [inputValue, setInputValue] = React.useState('');

	React.useEffect(() => {
		// Function expression instead of declaration
		const fetchOptions = async () => {
			const response = await fetch('/api/options');
			const data = await response.json();
			setOptions(data);
		};

		if (!propOptions) {
			fetchOptions();
		}
	}, [propOptions]);

	const handleSelectChange = (newSelected: OptionType[]) => {
		setSelected(newSelected);
		onChange(newSelected);
	};

	const handleUnselect = (option: OptionType) => {
		handleSelectChange(selected.filter((s) => s.id !== option.id));
	};

	const selectables = options.filter(
		(option) => !selected.some((s) => s.id === option.id),
	);

	const handleKeyDown = React.useCallback(
		(e: React.KeyboardEvent<HTMLDivElement>) => {
			const input = inputRef.current;
			if (input) {
				if (e.key === 'Delete' || e.key === 'Backspace') {
					if (input.value === '') {
						setSelected((prev) => {
							const newSelected = [...prev];
							newSelected.pop(); // Remove the last selected item
							return newSelected;
						});
					}
				}
				if (e.key === 'Escape') {
					input.blur(); // Lose focus from the input on pressing Escape
				}
			}
		},
		[],
	); // Empty dependency array

	return (
		<Command
			onKeyDown={handleKeyDown}
			className='overflow-visible bg-transparent'>
			<div className='group border border-input px-3 py-2 text-sm ring-offset-background rounded-md focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2'>
				<div className='flex gap-1 flex-wrap'>
					{selected.map((option) => (
						<Badge key={option.id} variant='secondary'>
							{option.name}
							<button
								className='ml-1 ring-offset-background rounded-full outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2'
								onClick={() => handleUnselect(option)}>
								<X className='h-3 w-3 text-muted-foreground hover:text-foreground' />
							</button>
						</Badge>
					))}
					<CommandPrimitive.Input
						ref={inputRef}
						value={inputValue}
						onValueChange={setInputValue}
						onBlur={() => setOpen(false)}
						onFocus={() => setOpen(true)}
						placeholder='Select options...'
						className='ml-2 bg-transparent outline-none placeholder:text-muted-foreground flex-1'
					/>
				</div>
			</div>
			<div className='relative mt-2'>
				{open && selectables.length > 0 ? (
					<div className='absolute w-full z-10 top-0 rounded-md border bg-popover text-popover-foreground shadow-md outline-none animate-in'>
						<CommandGroup className='h-full overflow-auto'>
							{selectables.map((framework) => {
								return (
									<CommandItem
										key={framework.id}
										onMouseDown={(e) => {
											e.preventDefault();
											e.stopPropagation();
										}}
										onSelect={(value) => {
											setInputValue('');
											setSelected((prev) => [...prev, framework]);
										}}
										className={'cursor-pointer'}>
										{framework.name}
									</CommandItem>
								);
							})}
						</CommandGroup>
					</div>
				) : null}
			</div>
		</Command>
	);
}
