import { tstampToShortStr, durationInMinutes } from './../utils'

describe('time-utils unit tests', () => {
    
        it('test timestamp in milliseconds is transformed to MM DD YY, h:mm format', () => {
            expect(tstampToShortStr(1370001284000)).toBe('05 31 13, 2:54')
        })

        it('test duration being less than 1 min is trasformed to 00:00:ss', () => {
            expect(durationInMinutes(57)).toBe('00:00:57')
        })

        it('test 1m < duration < 2m is trasformed to 00:01:ss', () => {
            expect(durationInMinutes(67)).toBe('00:01:07')
        })

        it('test 1h < duration < 2h is trasformed to 01:mm:ss', () => {
            expect(durationInMinutes(4667)).toBe('01:17:47')
        })
    })