import Benchmark from "benchmark";
import { MutationTracker } from "../main";

const SUITE_NAME = "MutationTracker";
const suite01 = new Benchmark.Suite(SUITE_NAME);

const suites = [
    suite01
]

suite01
    .add('Empty initialization', function () {
        MutationTracker({}, {
            defaultValue: false
        })
    })
    .add('Object initialization', function () {
        MutationTracker({ name: { firstname: '', lastname: '' }, roles: [], address: '' }, {
            defaultValue: false
        })
    })
    .add('Object initialization with initial mutation', function () {
        MutationTracker({ name: { firstname: '', lastname: '' }, roles: [], address: '' }, {
            initialMutation: {
                mutatedAttributes: ['name.firstname', 'name.lastname'],
                mutatedValue: true
            },
            defaultValue: false
        })
    });

for (const suite of suites) {
    suite
        .on('cycle', function (event: Benchmark.Event) {
            console.log(String(event.target));
        })
        .on('complete', function () {
            console.log('Fastest is ' + suite.filter('fastest').map('name'));
        })
        // run async
        .run({ 'async': true });
}