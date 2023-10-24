<div class="flex flex-col mt-10 px-4 sm:px-6 lg:px-8">
	<slot name="button" />
	<div class="mt-8 flow-root">
		<div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
			<div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
				<div class="overflow-hidden shadow ring-1 ring-black ring-opacity-5 sm:rounded-lg">
					<slot name="table" />
				</div>
			</div>
		</div>
	</div>
</div>
