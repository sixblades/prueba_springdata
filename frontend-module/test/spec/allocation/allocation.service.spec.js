/*jshint -W117 */
describe('Allocation -> Service', function () {
	var $httpBackend;

	beforeEach(module('mentoringApp'));

	beforeEach(inject(function (_$httpBackend_) {
		$httpBackend = _$httpBackend_;
	}));

	var getCacheBusterURL = function (url) {
        var regex_friendly_req = url.replace(/\//g, '\\/');
        return new RegExp(regex_friendly_req + '\\?cacheBuster=[0-9]+');
	};

	it('should contains a service named Empleados', function () {
		inject(function (Empleados) {
			expect(Empleados).not.toBe(null);
		});
	});

	it('should return a list of employees', function () {
		var employee2 = [{ id: 1, name: 'Shaq ONeal' }, { id: 2, name: 'Charles Barkley' }];

		var expected = getCacheBusterURL('api/employeeEvaluable');
		$httpBackend.expect('GET', expected).respond(200, employee2);
		var result = Empleados.query();
		$httpBackend.flush();

		expect(result).not.toBe(null);
		expect(result[0].name).toBe('Shaq ONeal');
		expect(result[1].name).toBe('Charles Barkley');
	});

	it('should return a employee', function () {
		var employee = [{ id: 3, name: 'Larry Bird' }];
		var expected = getCacheBusterURL('api/employeeEvaluable/3');
		$httpBackend.expect('GET', expected).respond(200, employee);
		var result = Empleados.query({ id: 3 });
		$httpBackend.flush();

		expect(result).not.toBe(null);
		expect(result[0].name).toBe('Larry Bird');
	});

	it('should update an employee', function () {
		var expected = getCacheBusterURL('api/employeeEvaluable');
		$httpBackend.expect('PUT', expected, { id: 4, name: 'Spudd Webb'}).respond(200, 'OK');
		Empleados.update({ id: 4, name: 'Spudd Webb' }).$promise.then(function (data) {
			expect(data).not.toBe(null);
		});
		$httpBackend.flush();
	});
});